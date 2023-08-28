const loadData = async (isShowAll) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const ai = data.data.tools;
  showData(ai, isShowAll);
};

const showData = (ai, isShowAll) => {
  const showDataContainer = document.getElementById("show-data-container");
  showDataContainer.textContent = "";
  const showAllBtn = document.getElementById("show-all-btn");
  if (ai.length > 5 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  // display only first 6
  if (!isShowAll) {
    ai = ai.slice(0, 6);
  }

  ai.forEach((item) => {
    console.log(item);
    const div = document.createElement("div");
    div.classList = "card  bg-base-100 shadow-xl";

    div.innerHTML = `
           <figure>
              <img
                src="${item.image}"
                alt="not found"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title font-bold">Features</h2>
              <ol>
                 ${item.features
                   .map(
                     (feature, index) => `<li>${`${index + 1} ${feature}`}</li>`
                   )
                   .join("")}
              </ol>

                <hr class = "mt-5">

                <div class = "my-3 font-bold text-2xl">
                ${item.name}
                </div>
                <div class = "font-semibold"> ${item.published_in} </div>
            </div>
  `;
    div.onclick = () => {
      showDetailsData(item.id);
    };

    showDataContainer.appendChild(div);
  });
};

const showDetailsData = async (id) => {
  console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const ai = data.data;
  console.log(ai);
  showAiDetails(ai);
};

const showAiDetails = (ai) => {
  const featureKey = Object.keys(ai.features);
  console.log(featureKey);
  my_modal_5.showModal();
  const showModal = document.getElementById("show-modal");
  showModal.innerHTML = `
  <div class = "flex flex-col-reverse md:flex-row gap-5">
  <!-- first  -->
  <div class = "w-full md:w-1/2 border border-orange-500 py-3 px-3 md:px-10 rounded-lg">
<h1 class = "font-semibold">${ai.description}</h1>
<div class = "grid grid-cols-3 gap-5 my-8">
${ai.pricing
  .map(
    (price) => `<p class = "text-amber-400 font-semibold"> ${price.price} </p>`
  )
  .join("")}
</div>
<div class = "flex gap-5">
<div>
<h1 class = "font-extrabold text-xl md:text-2xl">Features</h1>
<div>${featureKey
    .map((key) => `<li class = "my-2 ">${ai.features[key].feature_name}</li>`)
    .join("")}</div>
</div>
<div>
<h1 class = "font-extrabold text-xl md:text-2xl">Integrations</h1>
<div>${ai.integrations
    .map((name) => `<p class = "my-2"> ${name} </p>`)
    .join("")}</div>
</div>
</div>
  </div>
  <!-- second  -->
  <div class = "w-full md:w-1/2">
    <div><img src="${ai.image_link[0]}" alt=""></div>
    <div class = "text-center my-3 font-bold">${
      ai.input_output_examples[0].input
    }</div>
    <div class = "text-center">${ai.input_output_examples[0].output}</div>
  </div>
</div>
  
  
  `;
};

const showAll = () => {
  loadData(true);
};

loadData();
