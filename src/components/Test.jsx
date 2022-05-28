import React from 'react';
import axios from 'axios';
import { Button } from "@shopify/polaris";
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from "@shopify/app-bridge-utils";

const Test = () => {
  // EXAMPLE: Querying a backend that has verifyAccess Shopify middleware
  const app = useAppBridge();
  const instance = axios.create();
  // Intercept all requests on this Axios instance
  instance.interceptors.request.use(function (config) {
    return getSessionToken(app) // requires a Shopify App Bridge instance
      .then((token) => {
        // Append your request headers with an authenticated token
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
  });
  
  const onClickHandler = () => {
    console.log("Button Clicked");
    instance.get("/test").then(data => console.log(data)).catch(error => console.log(error));
  }

  return (
    <Button onClick={onClickHandler}>Test Backend</Button>
  )
}

export default Test;