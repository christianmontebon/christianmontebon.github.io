declare module '*.md' {
  const content: string
  export default content
}

declare module '*.md?raw' {
  const content: string
  export default content
}

// Optional: other raw text assets, if needed
declare module '*?raw' {
  const content: string
  export default content
}
