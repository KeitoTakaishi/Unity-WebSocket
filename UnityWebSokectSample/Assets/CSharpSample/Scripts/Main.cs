using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;

public class Main : MonoBehaviour {

	void Start () {
		
	}
	
	void Update () {
		//DelegateTest.Hoge(Hoge, "Hoge Method");
		DelegateTest.Hoge((a, b) =>
			{Debug.Log(a + ":"+b.ToString());},"Lamda");
		
	}

//	void Hoge(string s, float f)
//	{
//		Debug.Log(s + ":" + f.ToString());
//	}
}
