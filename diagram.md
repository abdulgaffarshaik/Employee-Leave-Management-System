```mermaid
graph TD
U[Employee / Manager / Admin]
U -->|UI Actions| F[React.js Frontend]
F -->|REST APIs| B[Node.js + Express Backend]
B -->|Read / Write| D[(MongoDB)]
B -->|Token Based Security| J[JWT Authentication]
