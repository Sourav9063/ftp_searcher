# ftp_searcher
All ftp media of Bangladesh.

node.js is prerequisite.

Clone the repo. Install all dependencies.
```bash
npm i
```

# Indexing working links

```bash
node index.js
```

[All_links.txt](https://github.com/Sourav9063/ftp_searcher/blob/main/All_links.txt) will have all available ftp links.
[All_working_links.txt](https://github.com/Sourav9063/ftp_searcher/blob/main/All_working_links.txt) will have all working ftp links.

# Opening Links
```bash
node open.js 1 10
```
This command will open 1-10 links from All_working_links.txt, in your default browser. Use small deviation for better performance.

```bash
node open.js //start //end
```
This is the general command.
