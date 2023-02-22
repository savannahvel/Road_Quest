function getLocations() {
    return new Promise((resolve, reject) => { 
        fetch('/markers').then((resp) => {
            return resp.json();
        }).then((data) => {
            return resolve(data);
        })
    })
}

async function createLocationButtons() {
    let tripIdData = document.querySelector('#trip-id');
    const tripId = tripIdData.value;
    const locationsData = await getLocations();
    console.log(tripId)
    // console.log(locationsData);
    for (let i = 0; i < locationsData.length; i++) {
        console.log(locationsData[i].Trip.id)
        if (locationsData[i].Trip.id == tripId) {
            // create element
            let locationButtonEl = document.createElement('button');
            locationButtonEl.className = 'location secondary';

            //Setting the text of the h3 element and p element.
            locationButtonEl.textContent = locationsData[i].location;

            // append to trip location container
            tripLocationsContainer.append(locationButtonEl);
        }
    }
}

createLocationButtons();