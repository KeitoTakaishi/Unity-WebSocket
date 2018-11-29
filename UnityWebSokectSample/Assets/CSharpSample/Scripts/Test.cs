using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour {

	void Start () {
		
	}
	
	void Update () {
		
	}
}

public class Test2
{
	public delegate void Delegate();

	public void func(Delegate delegateMethod)
	{
		delegateMethod();
	}
}
