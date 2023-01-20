# Remotion video

<p align="center">
  <a href="https://github.com/JonnyBurger/remotion-logo">
    <img src="https://github.com/JonnyBurger/remotion-logo/raw/main/withtitle/element-0.png">
  </a>
</p>



# SSR HTTP GET Method
  
 **Install all libraries**
 ```console
npm install
```
 **Terminal 1 -> Start server for API.**
 ```console
npm run server
```
 - go to browser and make and run url eg:
 ```console
  http://localhost:8000/?titleColor=white&wordText=What does Hellow world means&definitionText=Three time  Lorum ipsum is a simply dummy text.&bgColor=#23a1a1a1&formate=video&definitionTextSize=17 
```
 - No need Question mark in in question text line(coz it break url) (default "?" is set).
 - If Need Thumbnail Do
 ```console 
	 formate=image
  ```
 in params.
 - URL successfuly executed then go to your local folder path you will find result as you expected.
  ```console
	 C:/Users/user/Downloads/
  ``` 
 **Postman Example**
 <p align="center">
  <a href="https://github.com/JonnyBurger/remotion-logo">
    <img src="https://github.com/CraftyPixels/ddm-video-generator/blob/master/postman-exp.PNG">
  </a>
</p>

# SSR UI FORM Method.

 **Install all libraries.**

 ```console
  npm install
```

 **Terminal 1 -> Start server for API.**

```console
 npm run server
```

**Terminal 2 -> Start client side**
```console
 npm start
``` 

 **go to browser**
 ```console  
 localhost:3000
``` 
 **Form inputext field suggestions.**
 
 - No need Question mark in "word" text input (coz it break api url) (default ? is set).
 - By default video is set.
 - Wait for download and then go to your local folder path you will find result as you expected.
  
```console
 C:/Users/user/Downloads/
``` 
 
 <p align="center">
  <a href="https://github.com/JonnyBurger/remotion-logo">
    <img src="https://github.com/CraftyPixels/ddm-video-generator/blob/master/thumbnail-demo-img.PNG">
  </a>
</p>

Welcome to your TTS Remotion project!

## Get Started

-   Create Azure Account
-   Create TTS service on Azure
-   Create AWS Account
-   Setup S3 Bucket with public access
    -   Configure bucket policy
        ```json
        {
        	"Version": "2008-10-17",
        	"Statement": [
        		{
        			"Sid": "AllowPublicRead",
        			"Effect": "Allow",
        			"Principal": {
        				"AWS": "*"
        			},
        			"Action": "s3:GetObject",
        			"Resource": "arn:aws:s3:::<YOUR-BUCKET-NAME>/*"
        		}
        	]
        }
        ```
    -   Configure bucket CORS
        -   Use it only as a template, we recommend you to edit "AllowedOrigins" entering your origin
        ```json
        [
        	{
        		"AllowedHeaders": ["*"],
        		"AllowedMethods": ["HEAD", "GET", "PUT", "POST", "DELETE"],
        		"AllowedOrigins": ["*"],
        		"ExposeHeaders": ["ETag", "x-amz-meta-custom-header"]
        	}
        ]
        ```
-   Copy `.env.example` to `.env` entering your secrets
-   Use method `textToSpeech` from `src/TextToSpeech/tts.ts` to convert Text to Audio, this method will return file url, you can use it as source of `<Audio />` component

## Example

[![Remotion TTS example](http://img.youtube.com/vi/gbIno38xdhQ/0.jpg)](http://www.youtube.com/watch?v=gbIno38xdhQ 'Remotion TTS example')

## Commands

**Start Preview**

```console
npm start
```

**Render video**

```console
npm run build
```

**Server render demo**

```console
npm run server
```

See [docs for server-side rendering](https://www.remotion.dev/docs/ssr) here.

**Upgrade Remotion**

```console
npm run upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/JonnyBurger/remotion/issues/new).

## License

Notice that for some entities a company license is needed. Read [the terms here](https://github.com/JonnyBurger/remotion/blob/main/LICENSE.md).
