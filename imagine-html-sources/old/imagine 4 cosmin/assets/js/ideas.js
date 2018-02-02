function createIdea(type, title, description, imageURL) {
    let temp = {};
    temp.typeSelect = type;
    temp.title = title;
    temp.description = description;
    //temp.user_id = this.currentUser._id;
    if (imageURL != null) {
    temp.imgUrl =imageURL;
    } else {
        if (type.includes("No Possessions") && (type.includes("No Countries") || type.includes("No Religions")))  temp.imgUrl = "assets/images/slider_generic_imagine.jpg";
        else if (type.includes("No Countries")) temp.imgUrl = "assets/images/slider_countries_imagine.jpg";
        else if (type.includes("No Possessions")) temp.imgUrl = "assets/images/slider_possessions_imagine.jpg";
        else if (type.includes("No Religions")) temp.imgUrl = "assets/images/slider_religion_imagine.jpg";
    }
    return temp;
  }
  
  var results = [];

    results.push(createIdea("No Possessions","Shared Meeting Room","A big meeting room, free of charge, for new entrepreneurs","assets/images/ideas/2.jpg"))
    results.push(createIdea("No Possessions","Sharing Bike","A bike needs to move, not to stand still. Use mine","assets/images/ideas/3.jpg"))
    results.push(createIdea("No Religions","A Cup of Tea with a Buddhist","A Buddhist invites people for a weekly cup of tea at his home in order to explain why you don't have to belong to a religion in order to believe that we are not alone in this universe"))
    results.push(createIdea("No Countries","Mexican american Peace Initiatives","A famous Mexican singer and a famous American actress start together initiatves via their social media in order to detect how many peaceful actions are currently being organized by the people to show that for many people not any border line or wall is necessary."))
    results.push(createIdea("No Possessions","Shared Garden","A gardener offering his tools for free to his neighbors. A sign in his garden that says \"sharing free garden\"contact me at www.imagineallthepeople.world","assets/images/ideas/12.jpg"))
    results.push(createIdea("No Religions","Religion and Money","A journalist showing figures of how much money diffrerent religions have in the banks"))
    results.push(createIdea("No Possessions","Free Transport","A truck driver offering free transport when his truck is half empty","assets/images/ideas/17.jpg"))
    results.push(createIdea("No Possessions","Free Room for Regugees","An 80 years old person in the Netherlands (my mother....) shares a bedroom for a refugee family from Siria waiting during months for a solution in a public refugees center"))
    results.push(createIdea("No Possessions","No Money Communities","An economist publishing articles about new and existing models of \"no money\"communities"))
    results.push(createIdea("No Possessions","Ex Banker","An ex banker giving weekly presentations about new ethic systems based on sharing","assets/images/ideas/20.jpg"))
    results.push(createIdea("No Possessions","Food Donation","At the end of every shift restaurants should donate the left over food to local homeless shelters or food banks","assets/images/ideas/22.jpg"))
    results.push(createIdea("No Possessions","Office Space for Foundations","Companies that share office space to foundations","assets/images/ideas/28.jpg"))
    results.push(createIdea("No Possessions","Wishlist","During the holidays, people can adopt the wishlist of a less fortunate child and buy them gifts","assets/images/ideas/37.jpg"))
    results.push(createIdea("No Countries","Painting Murals","Each bordering country will come together and paint morals to cover the border walls","assets/images/ideas/38.jpg"))
    results.push(createIdea("No Religions","Holy Gardens","Establish holy gardens that are open for anyone of any religion to pray at"))
    results.push(createIdea("No Possessions","Sharing Houses","Exchanging appartments and houses. A kind of Airbnb, but without money.","assets/images/ideas/42.jpg"))
    results.push(createIdea("No Countries","War History","History teacher that teaches how wars were started in defense of a certain country","assets/images/ideas/46.jpg"))
    results.push(createIdea("No Countries","Global Conference","Hold a conference where someone is nominated by each country to go and give a speech as to why they love their country. This conference could be aired on TV for all children and adults to watch and learn about other countries","assets/images/ideas/47.jpg"))
    results.push(createIdea("No Countries","Food Festival","Holding a huge food festival where there are different tents setup for each country to cook native food","assets/images/ideas/48.jpg"))
    results.push(createIdea("No Religions","Things in Common Between Different Religions","In Indonesia a Hindu woman creates a group at \"Imagine ALL THE PEOPLE\"in order to invite other persons with other religious backgrounds in order to research all the positive things theirs religions share and  have in common."))
    results.push(createIdea("No Religions","Teaching All Religion","Instead of learning one religion in school, children should learn a little about every religion"))
    results.push(createIdea("No Countries","Grants for Kids","Offer grants and encourage kids to travel the world from a young age","assets/images/ideas/59.jpg"))
    results.push(createIdea("No Possessions","Sharing Garden","Offering parts of your garden for children living in apartments to play and grow food","assets/images/ideas/60.jpg"))
    results.push(createIdea("No Countries","Referendum","Organizing a global symbolic referendum about who wants a world without countries","assets/images/ideas/62.jpg"))
    results.push(createIdea("No Religions","Shared Beliefs","Organizing one big event where many different religions come together and share their beliefs with the public"))
    results.push(createIdea("No Countries","Skyping at Schools","Organizing Skype meetings between schools of different countries to exchange cultures","assets/images/ideas/64.jpg"))
    results.push(createIdea("No Possessions","Free Car Sharing","People that offer seats in their cars for free rides to work or for long trips","assets/images/ideas/68.jpg"))
    results.push(createIdea("No Possessions, No Religions, No Countries","Venus Project","Promoting the Venus Project USA","assets/images/ideas/71.jpg"))
    results.push(createIdea("No Countries","Young Speakers","Universities inviting one different nationality every week in order to speak about their culture (young speakers)","assets/images/ideas/78.jpg"))


    for (let idea of results) {
        document.getElementById("ideas").innerHTML+= `
        <div class="col-sm-6 col-md-6">
            <div class="thumbnail">
                <div class="thumImg">
                    <img width="100%" src="${idea.imgUrl}" alt="${idea.title}" class="imageFit lazyload">
                </div>
                <div class="caption">
                    <h3 class="blogPost-title">${idea.title}</h3>
                    <p>${idea.description}</p>
                </div>
            </div>
        </div>`;
    }