import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { select, create, zoom, zoomIdentity, forceX, forceY } from 'd3';
import { forceSimulation, forceManyBody, forceCenter, forceCollide, forceLink } from 'd3-force';
import type { Simulation, SimulationNodeDatum } from 'd3-force';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipContent } from "./tools/Tooltip"
import { Button } from "./tools/Button"
import { cn } from "./tools/utils"

interface Node extends SimulationNodeDatum {
  id: string;
  label: string;
  category: string;
  value: number;
  url?: string; // Optional URL for leaf nodes
  description?: string; // Optional description for tooltip
  used?: boolean; // Track tools I've used
}

interface Link {
  source: string | Node;
  target: string | Node;
}

interface CategoryConfig {
  name: string;
  color: string;
}

const categoryConfig: CategoryConfig[] = [
  { name: 'Chatbot', color: '#1E3A8A' }, // Dark Blue
  { name: 'Video Generation', color: '#4F46E5' }, // Indigo
  { name: 'Voice Generation', color: '#EC4899' }, // Pink
  { name: 'General', color: '#8B5CF6' }, // Violet
  { name: 'Images', color: '#D946EF' }, // Fuchsia
  { name: 'Code', color: '#F43F5E' },  // Red
  { name: 'Research', color: '#FB7185' }, // Rose
  { name: 'Agents', color: '#F9A8D4' }, // Light Pink
  { name: 'Education', color: '#34D399' }, // Emerald
];

const AIToolsMap = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listViewRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    // Category nodes
    { id: 'Chatbot', label: 'Chatbots', category: 'Chatbot', value: 60, description: "General Chatbot Tools" },
    { id: 'Video Generation', label: 'Video Generation', category: 'Video Generation', value: 50, description: "Tools for generating videos" },
    { id: 'General', label: 'General', category: 'General', value: 30, description: "General AI Tools" },
    { id: 'Images', label: 'Images', category: 'Images', value: 70, description: "AI Image Tools" },
    { id: 'Code', label: 'Code', category: 'Code', value: 30, description: "AI Code Generation Tools" },
    { id: 'Research', label: 'Research', category: 'Research', value: 20, description: "AI Research Tools" },
    { id: 'Agents', label: 'Agents', category: 'Agents', value: 45, description: "AI Agents" },
    { id: 'Education', label: 'Education', category: 'Education', value: 35, description: "AI in Education" },

    // Existing tool nodes
    { id: 'grok', label: 'Grok', category: 'Chatbot', value: 20, url: 'https://grok.x.ai/', description: "Grok Chatbot", used: true },
    { id: 'chatgpt', label: 'ChatGPT', category: 'Chatbot', value: 30, url: 'https://chat.openai.com/', description: "OpenAI ChatGPT", used: true },
    { id: 'bard', label: 'Bard', category: 'Chatbot', value: 25, url: 'https://bard.google.com/', description: "Google Bard", used: true },
    { id: 'claude', label: 'Claude', category: 'Chatbot', value: 18, url: 'https://claude.ai/', description: "Anthropic Claude", used: true },

    { id: 'runway-ml', label: 'RunwayML', category: 'Video Generation', value: 20, url: 'https://runwayml.com/', description: "RunwayML Video Tools" },
    { id: 'pika', label: 'Pika', category: 'Video Generation', value: 15, url: 'https://pika.art/', description: "Pika Labs" },
    { id: 'dalle3', label: 'DALL-E 3', category: 'Images', value: 25, url: 'https://openai.com/dall-e-3/', description: "OpenAI DALL-E 3", used: true },
    { id: 'midjourney', label: 'Midjourney', category: 'Images', value: 30, url: 'https://www.midjourney.com/', description: "Midjourney" },
    { id: 'stable-diffusion', label: 'Stable Diffusion', category: 'Images', value: 28, url: 'https://stability.ai/', description: "Stable Diffusion" },

    { id: 'github-copilot', label: 'GitHub Copilot', category: 'Code', value: 30, url: 'https://github.com/features/copilot', description: "GitHub Copilot", used: true },
    { id: 'codewhisperer', label: 'CodeWhisperer', category: 'Code', value: 25, url: 'https://aws.amazon.com/codewhisperer/', description: "AWS CodeWhisperer" },

    // Missing nodes that appear in links
    { id: 'sesame', label: 'Sesame', category: 'Chatbot', value: 15, url: 'https://www.sesamechat.ai/', description: "Voice-based AI assistant", used: true },
    { id: 'sora', label: 'Sora', category: 'Video Generation', value: 25, url: 'https://openai.com/sora', description: "OpenAI's text-to-video model", used: true },
    { id: 'gemini-co-drawing', label: 'Gemini Drawing', category: 'Images', value: 20, url: 'https://gemini.google.com/', description: "Collaborative AI drawing with Gemini", used: true },
    { id: 'google-ai-studio', label: 'Google AI Studio', category: 'General', value: 22, url: 'https://makersuite.google.com/', description: "Google's AI development platform", used: true },
    { id: 'chatgpt-deep-search', label: 'ChatGPT Deep Search', category: 'Research', value: 18, url: 'https://chat.openai.com/', description: "Advanced search capabilities in ChatGPT", used: true },
    { id: 'notebook-lm', label: 'Notebook LM', category: 'Education', value: 20, url: 'https://notebooklm.google/', description: "AI-powered Education notebook", used: true },
    { id: 'gamma', label: 'Gamma', category: 'Education', value: 18, url: 'https://gamma.app/', description: "AI-powered presentation creation", used: true },
    { id: 'cursor', label: 'Cursor', category: 'Code', value: 20, url: 'https://cursor.sh/', description: "AI code editor" },
    { id: 'windsurf', label: 'Windsurf', category: 'Code', value: 15, url: 'https://www.windsurfai.com/', description: "AI code development platform" },
    { id: 'chatgpt-operator', label: 'ChatGPT Operator', category: 'Agents', value: 18, url: 'https://github.com/tjunlp-lab/Operator', description: "ChatGPT powered automation agent" },
    { id: 'manus', label: 'Manus', category: 'Agents', value: 15, url: 'https://manus.im/', description: "AI assistant for complex tasks" },
  ]);
  const [links, setLinks] = useState<Link[]>([
    { source: 'Chatbot', target: 'grok' },
    { source: 'Chatbot', target: 'chatgpt' },
    { source: 'Chatbot', target: 'bard' },
    { source: 'Chatbot', target: 'claude' },
    { source: 'Chatbot', target: 'sesame' },
    { source: 'Video Generation', target: 'runway-ml' },
    { source: 'Video Generation', target: 'pika' },
    { source: 'Video Generation', target: 'sora' },
    { source: 'Images', target: 'dalle3' },
    { source: 'Images', target: 'midjourney' },
    { source: 'Images', target: 'stable-diffusion' },
    { source: 'Images', target: 'gemini-co-drawing' },
    { source: 'General', target: 'google-ai-studio' },
    { source: 'Research', target: 'chatgpt-deep-search' },
    { source: 'Education', target: 'notebook-lm' },
    { source: 'Education', target: 'gamma' },
    { source: 'General', target: 'google-ai-studio' },
    { source: 'Code', target: 'github-copilot' },
    { source: 'Code', target: 'codewhisperer' },
    { source: 'Code', target: 'cursor' },
    { source: 'Code', target: 'windsurf' },
    { source: 'Agents', target: 'chatgpt-operator' },
    { source: 'Agents', target: 'manus' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<{ label: string; description?: string; used?: boolean } | null>(null);
  const [isListView, setIsListView] = useState(false);
  const [simulation, setSimulation] = useState<Simulation<Node, Link> | null>(null);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add a reset function to clear filters
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleNodeClick = useCallback((node: Node) => {
    if (node.url) {
      window.open(node.url, '_blank');
    } else {
      setSelectedCategory(prevCategory => prevCategory === node.id ? null : node.id);
    }
  }, []);

  const getCategoryColor = (category: string) => {
    const categoryConfigItem = categoryConfig.find(c => c.name === category);
    return categoryConfigItem ? categoryConfigItem.color : '#999';
  };

  // Memoize filtered nodes and links to prevent unnecessary recalculations
  const filteredNodes = useMemo(() =>
    selectedCategory
      ? nodes.filter(node => node.category === selectedCategory || node.id === selectedCategory)
      : nodes,
    [nodes, selectedCategory]
  );

  const filteredLinks = useMemo(() =>
    selectedCategory
      ? links.filter(link => {
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;
        return sourceId === selectedCategory ||
          targetId === selectedCategory ||
          filteredNodes.some(n => n.id === sourceId) &&
          filteredNodes.some(n => n.id === targetId);
      })
      : links,
    [links, selectedCategory, filteredNodes]
  );

  // Filter the nodes based on search query and category selection
  const filteredListNodes = useMemo(() => {
    // Start with either the category-filtered nodes or all non-category nodes
    let baseNodes = selectedCategory
      ? filteredNodes.filter(node => node.id !== node.category) // Only show tool nodes when a category is selected
      : nodes.filter(node => node.id !== node.category); // Filter out category nodes

    // Then apply search filtering
    return baseNodes
      .filter(node => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          node.label.toLowerCase().includes(query) ||
          node.category.toLowerCase().includes(query) ||
          (node.description && node.description.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically
  }, [nodes, searchQuery, selectedCategory, filteredNodes]);

  // Separate simulation creation from the rest of the effect
  const createNewSimulation = useCallback(() => {
    if (!svgRef.current) return null;

    // Create a brand new simulation
    return forceSimulation<Node>()
      .nodes(filteredNodes)
      .force('charge', forceManyBody().strength(-20))  // Mild attraction
      .force('center', forceCenter(0, 0))
      .force('collision', forceCollide<Node>().radius(d => d.value * 3 + 10).strength(0.7))
      .force('link', forceLink<Node, Link>(filteredLinks).id(d => d.id).distance(50).strength(1.5))
      .force('x', forceX().strength(0.05))  // Gentle pull toward center
      .force('y', forceY().strength(0.05))
      .velocityDecay(0.4)
      .alpha(1);
  }, [filteredNodes, filteredLinks]);

  // Effect that runs when filteredNodes/Links change and manages visualization
  useEffect(() => {
    if (!svgRef.current) return;

    // Stop previous simulation if it exists
    if (simulation) {
      simulation.stop();
    }

    const svg = select(svgRef.current);

    // Clear existing graph elements
    svg.select("g.graph-container").remove();

    // Create fresh container
    const graphG = svg.append("g").attr("class", "graph-container");

    const width = containerRef.current?.offsetWidth || 800;
    const height = containerRef.current?.offsetHeight || 600;

    svg.attr('viewBox', [-width / 2, -height / 2, width, height] as any)
      .attr('width', width)
      .attr('height', height);

    // Get new simulation from our callback
    const newSimulation = createNewSimulation();
    if (!newSimulation) return;

    // Create links
    const linkElements = graphG.selectAll<SVGLineElement, Link>('line.link')
      .data(filteredLinks)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#aaa')
      .style('stroke-width', 1);

    // Create nodes
    const nodeElements = graphG.selectAll<SVGGElement, Node>('g.node')
      .data(filteredNodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .on('click', (event, d) => handleNodeClick(d))
      .on('mouseenter', (event, d) => {
        setTooltipContent({ label: d.label, description: d.description, used: d.used });
      })
      .on('mouseleave', () => {
        setTooltipContent(null);
      });

    nodeElements.append('circle')
      .attr('r', d => d.value * 2)
      .style('fill', d => {
        const baseColor = getCategoryColor(d.category);
        // Make tools I've used more vivid, others more opaque
        if (d.url) {
          return d.used ? baseColor : `${baseColor}80`; // 80 = 50% opacity in hex
        }
        return baseColor;
      })
      .style('stroke', 'none') // Remove the white border
      .style('cursor', (d: Node) => d.url ? 'pointer' : d.id === selectedCategory ? 'default' : 'pointer');

    // Add a secondary circle inside category nodes
    nodeElements.filter(d => d.id === d.category)
      .append('circle')
      .attr('r', d => d.value * 1.3)
      .style('fill', 'none')
      .style('stroke', 'rgba(255,255,255,0.5)')
      .style('stroke-width', 2);

    nodeElements.append('text')
      .text(d => d.label)
      .attr('text-anchor', 'middle')
      .attr('y', d => d.value > 10 ? 3 : 0)
      .style('font-size', d => (d.value > 15 ? '12px' : '10px'))
      .style('fill', 'white')
      .style('pointer-events', 'none');

    // Set up tick function
    newSimulation.on('tick', () => {
      nodeElements.attr('transform', (d: Node) => `translate(${d.x},${d.y})`);
      linkElements
        .attr('x1', (d: Link) => (typeof d.source === 'object' ? d.source.x : 0) || 0)
        .attr('y1', (d: Link) => (typeof d.source === 'object' ? d.source.y : 0) || 0)
        .attr('x2', (d: Link) => (typeof d.target === 'object' ? d.target.x : 0) || 0)
        .attr('y2', (d: Link) => (typeof d.target === 'object' ? d.target.y : 0) || 0);

      // Don't auto-stop here as it can cause state updates during render
      // Let simulation run until component unmounts or dependencies change
    });

    // Setup zoom
    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 3])
      .on("zoom", (event) => {
        graphG.attr("transform", event.transform);
      });

    // Apply zoom behavior
    svg.call(zoomBehavior);

    // Apply initial zoom transform to show all nodes
    svg.call(zoomBehavior.transform, zoomIdentity.translate(0, 0).scale(0.4));

    // Store new simulation in React state - this is now the LAST operation in the effect
    setSimulation(newSimulation);

    // Cleanup
    return () => {
      if (newSimulation) newSimulation.stop();
    };
  }, [filteredNodes, filteredLinks, handleNodeClick, createNewSimulation]);

  // Keep the resize effect but modify it to work with the current simulation
  useEffect(() => {
    const handleResize = () => {
      if (simulation && svgRef.current) {
        const width = containerRef.current?.offsetWidth || 800;
        const height = containerRef.current?.offsetHeight || 600;

        const svg = select(svgRef.current);

        const zoomBehavior = zoom<SVGSVGElement, unknown>()
          .scaleExtent([0.2, 3])  // min/max zoom scale
          .on("zoom", (event) => {
            // Apply the 2D transform (translate + scale) to the inner group
            select("g.graph-container").attr("transform", event.transform);
          });

        // Attach zoom listener to the SVG. This gives mouse-wheel & panning.
        svg.call(zoomBehavior);

        // If you want an initial scale or offset:
        // svg.call(zoomBehavior.transform, zoomIdentity.scale(0.7));

        svg.attr('viewBox', [-width / 2, -height / 2, width, height] as any).attr('width', width).attr('height', height);

        simulation.force('center', forceCenter(width / 2, height / 2));
        simulation.alphaTarget(0).restart();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [simulation]);

  // Add event handler to close list view when clicking outside
  useEffect(() => {
    if (!isListView) return;

    const handleOutsideClick = (event: MouseEvent) => {
      // Fix the Node type confusion by explicitly checking if target is an Element
      if (
        listViewRef.current &&
        !listViewRef.current.contains(event.target as Element) &&
        event.target instanceof Element &&
        // Don't close when clicking on buttons to prevent immediate closing after opening
        !event.target.closest('button')
      ) {
        setIsListView(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isListView]);

  // Add event handler to clear tooltip when clicking outside
  useEffect(() => {
    if (!tooltipContent) return;

    const handleOutsideTooltipClick = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Element) &&
        event.target instanceof Element &&
        !event.target.closest('.node') // Not clicking on a node
      ) {
        setTooltipContent(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideTooltipClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideTooltipClick);
    };
  }, [tooltipContent]);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-gray-100/80 rounded-lg">
      <svg ref={svgRef} className="w-full h-full">
        {/* Nodes and links will be added here by D3 */}
      </svg>

      <AnimatePresence>
        {tooltipContent && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-4 left-4 z-10" // Position as needed
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div style={{ display: 'none' }}></div>
              </TooltipTrigger>
              <TooltipContent
                className="bg-white/90 text-black border border-gray-300 shadow-lg rounded-md p-3 max-w-[250px]"
                align="start"
              >
                <p className="font-semibold text-sm">{tooltipContent.label}</p>
                {tooltipContent.used && (
                  <p className="text-xs text-green-600 font-medium mt-1">
                    ✓ I've used this tool
                  </p>
                )}
                {tooltipContent.description && (
                  <p className="text-xs text-gray-700 mt-1">{tooltipContent.description}</p>
                )}
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View toggle buttons with fixed highlighting */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
        <Button
          variant={!isListView ? "default" : "outline"}
          onClick={() => setIsListView(false)}
          className={cn(
            "text-xs px-3 py-1.5 rounded-md transition-all duration-200",
            !isListView
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-100/80"
          )}
        >
          Graph View
        </Button>
        <Button
          variant={isListView ? "default" : "outline"}
          onClick={() => setIsListView(true)}
          className={cn(
            "text-xs px-3 py-1.5 rounded-md transition-all duration-200",
            isListView
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-100/80"
          )}
        >
          List View
        </Button>
      </div>

      {/* Second row of controls */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
        <Button
          variant="outline"
          onClick={() => setIsInstructionsOpen(true)}
          className="text-xs px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-md 
                   shadow-sm text-blue-600 border-blue-300 hover:bg-blue-50/80 
                   transition-all duration-200"
        >
          How to Use
        </Button>
        <Button
          variant="outline"
          onClick={handleResetFilters}
          className="text-xs px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-md 
                   shadow-sm text-red-500 border-red-300 hover:bg-red-50/80 
                   transition-all duration-200"
        >
          Reset Filters
        </Button>

      </div>

      <AnimatePresence>
        {isListView && (
          <motion.div
            ref={listViewRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-20 left-4 right-4 bg-white/90 backdrop-blur-md rounded-lg shadow-lg z-10 flex flex-col"
            style={{
              maxHeight: 'calc(60vh - 6rem)',  // 80% of viewport height minus some padding
              height: 'auto'
            }}
          >
            <div className="sticky top-0 bg-white/95 z-10 border-b border-gray-200 p-4 pb-3">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                {selectedCategory
                  ? `${selectedCategory} Tools`
                  : "All AI Tools"}
              </h2>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="overflow-y-auto p-4 pt-2 flex-1">
              {filteredListNodes.length > 0 ? (
                <div className="space-y-4">
                  {filteredListNodes.map(node => (
                    <div
                      key={node.id}
                      className={cn(
                        "p-3 rounded-md",
                        "transition-colors duration-200",
                        "border border-gray-200",
                        "hover:bg-gray-100",
                        node.url ? "cursor-pointer" : "cursor-default"
                      )}
                      onClick={() => node.url && window.open(node.url, '_blank')}
                    >
                      <div>
                        <p className="font-medium text-gray-800">{node.label}</p>
                        <p className="text-sm text-gray-600">Category: {node.category}</p>
                        {node.description && <p className="text-xs text-gray-500">{node.description}</p>}
                        {node.used && (
                          <p className="text-xs text-green-600 font-medium mt-1">✓ I've used this tool</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  {selectedCategory
                    ? `No tools found in ${selectedCategory} category matching your search.`
                    : "No tools match your search."}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInstructionsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
            onClick={() => setIsInstructionsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg mx-4 overflow-y-auto max-h-[80vh]"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                How to Use the AI Tools Explorer
              </h2>

              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm">
                <section>
                  <h3 className="font-semibold text-base mb-1 dark:text-white">Exploring the Graph</h3>
                  <p>
                    This visualization shows AI tools organized by category. Larger circles represent
                    categories, while smaller connected circles represent individual tools.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-base mb-1 dark:text-white">Interactions</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Click on a category</strong> to filter and focus on just those tools</li>
                    <li><strong>Click on a tool</strong> to visit its website</li>
                    <li><strong>Hover over any node</strong> to see its description</li>
                    <li><strong>Scroll or pinch</strong> to zoom in and out</li>
                    <li><strong>Drag the background</strong> to pan around</li>
                    <li><strong>Switch to List View</strong> using the button in the top-right corner</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-base mb-1 dark:text-white">Color Indicators</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Vivid colors</strong> indicate tools I've personally used</li>
                    <li><strong>Faded colors</strong> indicate tools I haven't tried yet</li>
                    <li><strong>Large circles</strong> represent categories of AI tools</li>
                  </ul>
                </section>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="default"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => setIsInstructionsOpen(false)}
                >
                  Got it
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIToolsMap;
