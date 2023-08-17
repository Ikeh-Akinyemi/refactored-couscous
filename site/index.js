import { Index } from './pkg/refactored_couscous';

const index = new Index();

// Sample data for demonstration purposes
index.add("Hello world");
index.add("Rust is amazing");
index.add("Wade in Rust");

// If you want to perform a search immediately after initialization:
const results = index.search("world");
console.log(results); // This will log the search results to the console