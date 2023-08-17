// src/lib.rs

use std::collections::HashMap;
use wasm_bindgen::prelude::*;
use js_sys::Array;

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct Token {
    word: String,
    position: usize,
    frequency: usize,
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct Index {
    data: Vec<String>,
    tokens: HashMap<String, Vec<Token>>,
}

impl Token {
    fn tokenize(s: &str) -> Vec<String> {
        s.to_lowercase()
            .split_whitespace()
            .map(|word| word.to_string())
            .collect()
    }
}

#[wasm_bindgen]
impl Index {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Index {
            data: Vec::new(),
            tokens: HashMap::new(),
        }
    }

    pub fn add(&mut self, s: &str) {
        let position = self.data.len();
        self.data.push(s.to_string());
        let tokens = Token::tokenize(s);
        for token in tokens {
            let frequency = s.matches(&token).count();
            self.tokens.entry(token.clone()).or_insert_with(Vec::new).push(Token {
                word: token,
                position,
                frequency,
            });
        }        
    }

    pub fn search(&self, query: &str) -> Array {
        let tokens = Token::tokenize(query);
        let mut results = Vec::new();
        for token in tokens {
            if let Some(matches) = self.tokens.get(&token) {
                for match_ in matches {
                    results.push(self.data[match_.position].clone());
                }
            }
        }
        results.sort();
        results.dedup();

        // Convert Vec<String> to js_sys::Array
        results.into_iter().map(JsValue::from).collect()
    }
}
