import("./node_modules/refactored-couscous/refactored_couscous.js").then((js) => {
  // js.greet("WebAssembly with npm");

  const index = new js.Index();
  index.add("Hello world");
  index.add("Rust is amazing");
  index.add("Wade in Rust");

  const results = index.search("rust");
  console.log(results); // ["Rust is amazing", "Wade in Rust"]
});
