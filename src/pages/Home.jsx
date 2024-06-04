import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React,{useEffect} from "react"
	import { formatPostcssSourceMap } from "vite";

export const Home = () => {
	let APIURL= "https://playground.4geeks.com/contact/agendas/thomasisa1/contacts"
let contacts = []
useEffect (() =>{
	fetch(store.APIURL)
	.then(response=>response.json())
	.then(data =>{
		console.log(data)
		contacts = data.contacts})
	.catch(error =>console.log(error))
},[])
	return (
		<div className="text-center mt-5">
		</div>
	);
}; 
