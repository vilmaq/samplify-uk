# Samplify

[Deployed GitHub Pages Site](https://leon3005.github.io/samplify-uk/)

## Motivation

Have you ever been listening to one of your favourite songs and noticed a short snippet of a song that you recognised, but couldn't quite put your finger on what it was? This is where Samplify comes in. Samplify allows you to search for any song and find samples of other songs that were used by the producer with playable YouTube links.

## How do I use Samplify?

To get started, simply click on the search bar and start to search for your favourite song by pressing 'Enter'. You then need to click on the artwork of that song to see the results. 

Click on the 'Genius' icon for any songs with samples to find the lyrics and even more song information. 

No sample found? Sadly, not all songs make use of samples, but you will instead be presented with a preview of that song via Apple Music. 

Stuck for inspiration? You can test some samples by clicking one of the randomly generated songs on the home page!


## Initial Diagram

![Homepage Diagram](./assets/images/homepageDiagram.png "Homepage Diagram")

## Screenshots

**Landing page:**

The landing page features a slider on the bottom of the page that allows you to select the artwork to see the sample, a search bar to find any requested songs, the Samplify logo, and a nav bar that allows you to see your favourited songs.
![Homepage](./assets/images/homepage_screenshot.png "Homepage")

**Search Results:**

When searching for a song, you are presented with the top 6 matches from Genius. Here, you can click on the artwork to view the samples or use the 'Add to favorites' button. You can also click the 'X' button to delete the card from the page. If all cards are deleted, you are presented with the original slider.
![Search Results](./assets/images/searchresults.png "Search Result")

**Sample Viewer:**

After clicking the artwork for a song, you will be given the below screen with the release date of the song, song name, artist, apple music preview for the song, and the samples that were used in the song with an embedded YouTube player:
![Samples](./assets/images/poundcakesample2.png "Example of Sample")
![Samples](./assets/images/touchtheskysample2.png "Example of Sample")

## Tech/framework used

<b>Built with</b>

- [Bulma](https://bulma.io/)
- [jQuery](https://jquery.com/)

## Features

- Search for a song by artist, song name, or lyric.
- View the song artwork, artist, artist image, and add the song to your favourites.
- Click the artwork and view the samples used in that song along with release date, Apple Music player, and embedded Youtube players for the samples.
- Click the Genius logo to view the lyrics on Genius.
- If no samples are found in that song, listen to the song via an Apple Music player modal.
- View favourited songs and click on them to view samples.
- Click on one of the randomly generated songs on the homepage to view recommended samples.
- Our responsive design allows you to enjoy our app on your mobile, tablet or PC!

## Code Example

The below is an example of an API call we used for Genius. As it was via Rapid API, we had to use header objects that we declared in a variable and then used in the fetch response.

![Code Example](./assets/images/headerobject.png "Example of Code")
![Code Example](./assets/images/fetchGenius.png "Example of Code")

## APIs

For this project we used the Genius API and the Youtube API.

Documentation for both of these can be found below:

- [Genius](https://docs.genius.com/)
- [Youtube](https://developers.google.com/youtube/v3)

The Genius API, via Rapid API, was used as a catalogue for when the user searches for a song. It will search for all results on Genius and can help be specified by adding the artist at the end of the song. We then display the song artwork, title, and artist in a card using Bulma. We also applied data attributes to the divs to use when fetching the sample. One of these core attributes is the song ID, as we need to use the Genius API again but this time with the song ID to get more details for the song, including the sample.

When the artwork is clicked, the next Genius fetch function will be called that will get again the artwork, title, artist, release date, and list of samples in that song. If the samples object is entry, a modal will pop up. If samples are available, we then got the sample objects and put them inside of the Youtube API fetch function. Here, we searched Youtube for the top result depending on the sample name and created a div with an embedded player for that song. We used a forEach in case there were multiple samples.

## Mobile View

(screen capture tool distorts the background image)

![Mobile Example](./assets/images/mobileviewsamples.png "Mobile View")
