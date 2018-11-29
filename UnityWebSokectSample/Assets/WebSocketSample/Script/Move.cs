using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Move : MonoBehaviour {

	void Start () {
		
	}
	
	// Update is called once per frame
	void Update ()
	{
		this.transform.position =new Vector3( 20.0f * Mathf.Sin(Time.realtimeSinceStartup),0,0);
	}
}
