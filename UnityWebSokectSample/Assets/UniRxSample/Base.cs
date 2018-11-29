using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Base : MonoBehaviour {

	void Start () {
		
	}

	public void Move(float dx, float dy)
	{
		gameObject.transform.position += new Vector3(dx, dy, 0.0f);
	}
}
