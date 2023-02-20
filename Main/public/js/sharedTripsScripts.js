// TODO: Get map owner's username and template into title. {Usernames}'s Shared Map

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
    const locationsData = await getLocations();
    for (let i = 0; i < locationsData.length; i++) {
        // create element
        let locationButtonEl = document.createElement('button');
        locationButtonEl.className = 'location secondary';

        //Setting the text of the h3 element and p element.
        locationButtonEl.textContent = locationsData[i].location;

        // append to trip location container
        tripLocationsContainer.append(locationButtonEl);
    }
    console.log("createLocationButtons Completed")
}

createLocationButtons();