// Borrowed from here: https://stackoverflow.com/a/15724300/2719960
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const csrfToken = getCookie("csrftoken");
