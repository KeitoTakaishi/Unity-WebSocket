using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;

public class Recieve : MonoBehaviour {

	private WebSocket ws;
	// Use this for initialization
	void Start () {
	}
     
	// Update is called once per frame
	void Update () {

		this.ws = new WebSocket("ws://127.0.0.1:8124");
		this.ws.OnMessage += (object sender, MessageEventArgs e) =>
		{
			Debug.Log(e.Data);
		};
		this.ws.Connect();
	}
}
