import { v4 as uuid } from "uuid";
export function getUserTempId() {
  //看看localstorage里面是否有userTempId 没有就创建一个
  let userTempId = localStorage.getItem("userTempId_key");
  if (!userTempId) {
    //这个id为唯一数,存储在localstorage中,设置一个key通过key拿到
    userTempId = uuid();
    localStorage.setItem("userTempId_key", userTempId);
  }
  return userTempId;
}
