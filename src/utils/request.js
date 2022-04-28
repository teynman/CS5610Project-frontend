import { message } from "antd";

export  function  request(path, params, method) {
  const config = {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json',
      'token':  localStorage.getItem('token')
    },
    method: method || 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // *client, no-referrer
  };
  if (!method || method === 'post' || method === 'put') {
    config.body = JSON.stringify(params);
  }
  return fetch('http://localhost:4000' + path, config)
    .then(response => response.json()).then(res => {
      const json = res;
      console.log('json===', json)
      // if (json.status_code !== 200 && json.status_code !== 104 && json.status_code != 0) {
      //   message.error(json.msg);
      //   return Promise.reject(json.msg)
      // } else { 
      return Promise.resolve(json)
      // }
    }).catch((error)=>{
      console.log('json===222222',error)
      message.error("error");
      return Promise.reject(error)
    });
}
