// Define a structure for a single search entry
#[derive(Debug, Clone)]
struct Entry {
    pub data: String,
    pub score: f32,
}

// Define a structure for the search index
#[derive(Default)]
struct Wade {
    index: std::collections::HashMap<String, Vec<Entry>>,
}

impl Wade {
    // Tokenize the input string
    pub fn tokenize(&self, input: &str) -> Vec<String> {
        input
            .to_lowercase()
            .split_whitespace()
            .map(|s| s.to_string())
            .collect()
    }
    
    // Add data to the search index
    pub fn add(&mut self, data: String) {
        let tokens = self.tokenize(&data);
        for token in tokens {
            self.index
                .entry(token)
                .or_insert_with(Vec::new)
                .push(Entry {
                    data: data.clone(),
                    score: 0.0, // We'll calculate this during the search
                });
        }
    }

    // Search the index and return results
    pub fn search(&self, query: &str) -> Vec<String> {
        let tokens = self.tokenize(query);
        let mut scores: std::collections::HashMap<String, f32> = std::collections::HashMap::new();

        for token in tokens {
            if let Some(entries) = self.index.get(&token) {
                for entry in entries {
                    // Increment the score for each matching token
                    let counter = scores.entry(entry.data.clone()).or_insert(0.0);
                    *counter += 1.0;
                }
            }
        }

        // Sort results by score
        let mut results: Vec<_> = scores.iter().collect();
        results.sort_by(|a, b| b.1.partial_cmp(a.1).unwrap());

        // Extract and return the data from the results
        results.iter().map(|(data, _)| (*data).clone()).collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_search() {
        let mut wade = Wade::default();
        wade.add("Hello World".to_string());
        wade.add("Hello Rust".to_string());
        wade.add("Rust is great".to_string());

        let results = wade.search("Hello");
        assert_eq!(results, vec!["Hello World", "Hello Rust"]);
    }
}
