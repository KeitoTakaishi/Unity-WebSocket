using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Design;
using UnityEngine;

public class EventTest : MonoBehaviour
{
	public delegate void Foo(float f);
	public static event Foo f = null;
	public static float totalTime = 0.0f;
	void Start () {
		
	}
	
	void Update ()
	{
		totalTime += Time.deltaTime;
		f(totalTime);
	}
	
	
}
