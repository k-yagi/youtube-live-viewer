# YouTube Live Viewer

You won't miss YouTube live stream.

# Install

```
$ git clone https://github.com/k-yagi/youtube-live-viewer && cd youtube-live-viewer && npm install
```

# Configure

Add the following environment variables in `.env`.

- `YOUTUBE_DATA_API_KEY`: API Key of YouTube Data Api.
  - [Learn more about Google Cloud Console](https://developers.google.com/youtube/v3/getting-started?hl=ja#before-you-start).
  - [Learn more about API key generation](https://developers.google.com/youtube/registering_an_application?hl=ja#create_project).
- `CHANNEL_IDS`: ID of YouTube Channel you want to get the data. If you want to specify more than one, please separate them by a comma.
  - Example: `CHANNEL_IDS='xxxx,yyyy,zzzz'`

# Start up

```
$ npm start
```
