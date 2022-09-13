# ftp_searcher
All ftp links for media and live tv of Bangladesh.
This nodejs scripts searches through all avaliable link in Bangladesh and enlist all working link for you Internet service.

node.js is prerequisite.

Clone the repo. Install all dependencies.
```bash
npm i
```

# Indexing working links
For indexing media(Movies,Tv series ,etc) links
```bash
node index.js --media
```
For indexing Live tv servers
```bash
node index.js --livetv
```

[Media/All_links.txt](https://github.com/Sourav9063/ftp_searcher/blob/main/Media/All_links.txt) will have all available ftp Media links.

[Media/All_working_links.txt](https://github.com/Sourav9063/ftp_searcher/blob/main/Media/All_working_links.txt) will have all working Media ftp links.

[LiveTv/All_links.txt](https://github.com/Sourav9063/ftp_searcher/blob/main/LiveTV/All_links.txt) will have all available ftp Live Tv links.

[LiveTv/All_working_links.txt](https://github.com/Sourav9063/ftp_searcher/blob/main/LiveTV/All_working_links.txt) will have all working Live Tv ftp links.

# Opening Links
Opening Media links
```bash
node open.js --media 1 10
```
Opening live tv servers
```bash
node open.js --livetv 1 10
```
This command will open 1-10 links from All_working_links.txt, in your default browser. Use small deviation for better performance.

```bash
node open.js {word containing 'l' or 'm'} {start} {end}
```
This is the general command.
