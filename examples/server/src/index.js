import { Index } from 'refactored-couscous-v1';

const index = new Index();
index.add("Hello world");
index.add("Rust is amazing");
index.add("Wade in Rust");

const results = index.search("rust");
console.log(results); // ["Rust is amazing", "Wade in Rust"]