const loadPhone = async (searchText, isShowAll = false) => {
    toggleLoadingSpinner(true); // Show spinner while fetching data
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
  };
  
  const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    // Clear phone container to avoid displaying previous search results
    phoneContainer.textContent = "";
    const showAllContainer = document.getElementById("show-all-container");
  
    if (phones.length > 12 && !isShowAll) {
      showAllContainer.classList.remove("hidden");
    } else {
      showAllContainer.classList.add("hidden");
    }
  
    if (!isShowAll) {
      phones = phones.slice(0, 12);
    }
  
    phones.forEach((phone) => {
      const phoneCard = document.createElement("div");
      phoneCard.classList = "card card-compact bg-base-100 p-5 shadow-xl";
      phoneCard.innerHTML = `
        <figure>
            <img src="${phone.image}" alt="${phone.phone_name}" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions m-3 justify-center">
                <button onclick="showDetail('${phone.slug}')" class="btn bg-lime-800 border-none text-white btn-primary">Buy Now</button>
            </div>
        </div>`;
      phoneContainer.appendChild(phoneCard);
    });
  
    // Hide loader
    toggleLoadingSpinner(false);
  };
  
  const handleSearch = (isShowAll = false) => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
  };
  
  const handleSearch2 = () => {
    const searchField = document.getElementById("search-field2");
    const searchText = searchField.value;
    loadPhone(searchText, false);
  };
  
  const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
      loadingSpinner.classList.remove("hidden");
    } else {
      loadingSpinner.classList.add("hidden");
    }
  };
  
  const showDetail = async (id) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
  };
  
  const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('detailed-phone-name');
    phoneName.innerText = phone.name;
    const showDetailedContainer = document.getElementById('show-detailed-container');
    showDetailedContainer.innerHTML = `
      <img class="mb-5 mt-5 justify-center" src="${phone.image}" alt="${phone.name}">
      <p><span class="font-semibold ">Storage:</span> ${phone.mainFeatures.storage}</p>
      <p><span class="font-semibold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
      <p><span class="font-semibold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
      <p><span class="font-semibold">Memory:</span> ${phone.mainFeatures.memory}</p>
      <p><span class="font-semibold">Release Date:</span> ${phone.releaseDate}</p>
      <p><span class="font-semibold">GPS:</span> ${phone.others?.GPS || 'N/A'}</p>
      <p><span class="font-semibold">Others:</span> ${phone.others.WLAN}</p>
    `;
    document.getElementById('show-details-modal').showModal();
  };
  
  const handleShowAll = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, true);
  };
  
  // Add event listener for "Show All" button
  document
    .getElementById("show-all-container")
    .addEventListener("click", handleShowAll);
  
  // Load default phones when the page loads
  window.onload = () => {
    loadPhone("samsung");
  };
  

