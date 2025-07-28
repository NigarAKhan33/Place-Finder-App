# About #
"Place Finder" App is an app for searching nearby places on a device. 
This is a mobile hybrid application. Additional platforms can be added depending on the needs. The same username and password are required to enter the basic login procedure. After successfully logging in, slect type of place, within distance and then click the "Search Places" button to start searching nearby places. Before doing any search, location permission/setting should be enabled on the device.
There is a network detector icon to detect current network status.
The user can exit the programme by clicking the "Logout" button at the top.

# Plug-ins #
In this app, we use the following plugins: 
	•	Geolocation plug-in - To get the current location of the device.
	•	Vibration plug-in - This plug-in vibrates the device to inform you when you attempt to logout.
	•	Network plug-in - To detect the network status, before searching nearby places
	•	Storage plug-in - To store the data you enter, persistent storage for the app
	•	Android Back Button Plug-in - To manage the device's back button, we display a confirm dialogue box.
	•	Android Exit App Plug-in - We use it on user confirmation to exit the app.

# Installation #
To execute this project, you must have NPM/Node installed. We constructed the project using version 9.8.1. To set up NPM/Node: 
- npm install -g npm@9.8.1
- Next, we need to install "Ionic":
- npm install -g @ionic/cli
- Finally, to install all packages, we do: npm install

# Creating a build for Browser:
Once all packages have been installed, we can use the browser to start the programme: 
ionic serve
To build (production version):
ionic build --prod

# Creating a build for Android:
It is advised that you install "Android Studio" on your system before attempting to build an app for the "Android" platform.
To add "Android" platform: ionic capacitor add android
To build on "Android" platform (production version): ionic capacitor build android --prod
This will launch the "Android Studio" application. You can use the run button to execute the app on the simulator/device.


Creating a build for Browser
Once all packages have been installed, we can use the browser to start the programme: 
ionic serve
To build (production version):
ionic build --prod

Creating a build for Android
It is advised that you install "Android Studio" on your system before attempting to build an app for the "Android" platform. To add "Android" platform: 
ionic capacitor add android
To build on "Android" platform (production version):
ionic capacitor build android --prod
This will launch the "Android Studio" application. You can use the run button to execute the app on the simulator/device.
