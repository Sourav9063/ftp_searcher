# ftp_searcher
All ftp links for media and live tv of Bangladesh.
This nodejs app searches through all avaliable link in Bangladesh and enlist all working link for you Internet service provider and allows to open then in your browser.

# Installation

Simply download the app for [Windows](https://github.com/Sourav9063/ftp_searcher/releases/download/1.0.0/app-win.exe), [MacOS](https://github.com/Sourav9063/ftp_searcher/releases/download/1.0.0/app-macos), [Linux](https://github.com/Sourav9063/ftp_searcher/releases/download/1.0.0/app-linux).
Open the app and follow the instructions.

(Please star the project 🌟)

![Screenshot 2022-09-13 072344](https://user-images.githubusercontent.com/53114581/189786873-ea7be633-87a7-4c7c-a202-c83e636441be.jpg)
![Screenshot 2022-09-14 041922](https://user-images.githubusercontent.com/53114581/190019523-8446eb43-4751-446c-8505-547fe58f3ff6.jpg)

This will open top 10 media links.
![Screenshot 2022-09-13 072739](https://user-images.githubusercontent.com/53114581/189787231-a537025f-8f4a-4f68-acd5-64ef24dfec21.jpg)
![Screenshot 2022-09-13 072852](https://user-images.githubusercontent.com/53114581/189787355-fe77adf2-8f67-4792-abed-af7fb61b99c2.jpg)

# Codes

Clone the repo. Install all dependencies.
```bash
npm i
```
node.js is prerequisite.
# Command line app
This has all of the functionalities.
```bash
node app.js
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

zljbypafhukwypchjfptwvzljvuayhkpjavyfylxbpyltluazavmbsmps

