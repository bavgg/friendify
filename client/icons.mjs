var fbicon = `<svg fill="#000000" width="64px" height="64px" viewBox="0 0 24 24" id="facebook-circle" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M16,9H14a2,2,0,0,0-2,2V21" style="fill: none; stroke: #2ca9bc; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><line id="secondary-2" data-name="secondary" x1="9" y1="14" x2="15" y2="14" style="fill: none; stroke: #2ca9bc; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line><circle id="primary" cx="12" cy="12" r="9" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></circle></g></svg>`;
var likeicon = `<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" id="like" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M7.25,20.12a9.47,9.47,0,0,0,4,.88h4.2a4,4,0,0,0,3.88-3l1.62-6.48A2,2,0,0,0,19,9H16a31.13,31.13,0,0,0,.12-3.77A2.28,2.28,0,0,0,13.82,3h-.05a2.2,2.2,0,0,0-2.15,1.72c-.36,1.5-.74,2.83-1.11,3.92A2,2,0,0,1,8.62,10H7.2" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><rect id="secondary" x="3" y="9" width="4" height="12" style="fill: none; stroke: #2ca9bc; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></rect></g></svg>`;
var searchicon = `<svg fill="#000000" width="34px" height="34px" viewBox="0 0 24 24" id="search" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><line id="secondary" x1="21" y1="21" x2="15" y2="15" style="fill: none; stroke: #2ca9bc; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line><circle id="primary" cx="10" cy="10" r="7" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></circle></g></svg>`;
var sendicon = `<svg fill="#000000" width="34px" height="34px" viewBox="0 0 24 24" id="send" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><line id="secondary" x1="7" y1="12" x2="11" y2="12" style="fill: none; stroke: #2ca9bc; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line><path id="primary" d="M5.44,4.15l14.65,7a1,1,0,0,1,0,1.8l-14.65,7A1,1,0,0,1,4.1,18.54l2.72-6.13a1.06,1.06,0,0,0,0-.82L4.1,5.46A1,1,0,0,1,5.44,4.15Z" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></g></svg>`;
var usericon = `<svg fill="#000000" width="34px" height="34px" viewBox="0 0 24 24" id="user" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M9,15h6a5,5,0,0,1,5,5v0a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1v0a5,5,0,0,1,5-5Z" style="fill: none; stroke: #2ca9bc; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><circle id="primary" cx="12" cy="7" r="4" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></circle></g></svg>`;

export function write(icon) {
  function write(icon) {
    switch (icon) {
      case "fb":
        document.write(fbicon);
        break;
      case "like":
        document.write(likeicon);
        break;
      case "search":
        document.write(searchicon);
        break;
      case "send":
        document.write(sendicon);
        break;
      case "user":
        document.write(usericon);
        break;
      default:
        document.write("");
    }
  }
}
