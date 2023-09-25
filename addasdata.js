function createAd_(x, t) {
  const sendMeParams = new URLSearchParams(x.sendMe);
  const targetUrlWithParams = `${x.target_url}${
    x.target_url.includes("?") ? "&" : "?"
  }${sendMeParams.toString()}`;

  const mxlink = `${x.mlink}${
    x.mlink.includes("?") ? "&" : "?"
  }${sendMeParams.toString()}&trgUrl=${btoa(targetUrlWithParams)}`;
  // &trgUrl=${btoa(targetUrlWithParams)}
  const ae = document.createElement("a");
  ae.href = mxlink;
  ae.target = "_blank";

  const adImage = document.createElement("img");
  adImage.src = x.image_url;
  adImage.alt = "Image";
  adImage.height = x.height || 250;
  adImage.width = x.width || 250;

  ae.appendChild(adImage);
  t.appendChild(ae);
}

// const Xtrgurl = new URLSearchParams(window.location.search).get("trgUrl");
// setTimeout(function () {
//   window.location.href = atob(Xtrgurl);
// }, 3000);

async function fetchAndDisplayAds_() {
  const adContainers = document.querySelectorAll(".ads-container");

  try {
    var vXads = `?${Date.now()}`;
    const response = await fetch(
      `https://useroneman.github.io/adsinone/data.json${vXads}`
    );
    const data = await response.json();
    //   data["ads"] = data;
    adContainers.forEach((container) => {
      const campaignId = container.getAttribute("data-campaign-id");
      const xadToShow = data.ads.find((ad) => ad.cid == campaignId);

      if (xadToShow) {
        xadToShow["mlink"] = data.mlink;
        createAd_(xadToShow, container);
      } else {
        console.error("No ad found for the specified campaign ID:", campaignId);
      }
    });
  } catch (error) {
    console.error("Error fetching ads:", error);
  }
}
fetchAndDisplayAds_();
