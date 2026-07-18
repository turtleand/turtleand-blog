import { mkdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const [inputArg, outputArg] = process.argv.slice(2);

if (!inputArg || !outputArg) {
  console.error("Usage: npm run tinify:image -- <input.png> <output.png>");
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
const outputPath = path.resolve(outputArg);

if (inputPath === outputPath) {
  console.error("Input and output paths must be different.");
  process.exit(1);
}

if (path.extname(outputPath).toLowerCase() !== ".png") {
  console.error("The output file must use the .png extension.");
  process.exit(1);
}

const inputMetadata = await sharp(inputPath).metadata();
const inputStats = await stat(inputPath);

await mkdir(path.dirname(outputPath), { recursive: true });

try {
  await sharp(inputPath)
    .png({
      compressionLevel: 9,
      effort: 10,
      palette: true,
      quality: 85,
    })
    .toFile(outputPath);

  const outputMetadata = await sharp(outputPath).metadata();
  const outputStats = await stat(outputPath);

  if (
    inputMetadata.width !== outputMetadata.width ||
    inputMetadata.height !== outputMetadata.height
  ) {
    await unlink(outputPath);
    throw new Error("Image dimensions changed during optimization.");
  }

  const savedBytes = inputStats.size - outputStats.size;
  const savedPercent = (savedBytes / inputStats.size) * 100;

  console.log(`Optimized ${path.relative(process.cwd(), inputPath)}`);
  console.log(`Output: ${path.relative(process.cwd(), outputPath)}`);
  console.log(`Dimensions: ${outputMetadata.width}x${outputMetadata.height}`);
  console.log(
    `Size: ${inputStats.size.toLocaleString()} -> ${outputStats.size.toLocaleString()} bytes (${savedPercent.toFixed(1)}% smaller)`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
