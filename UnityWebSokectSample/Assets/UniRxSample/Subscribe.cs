using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UniRx;
using UniRx.Triggers;

public class Subscribe : MonoBehaviour {

	void Start ()
	{
		Observable.Return(new Vector3(0, 1, 0))
			.Subscribe((v => gameObject.transform.position = v));
		this.UpdateAsObservable().Subscribe(_ => Move(0.01f, 0));
	}


	public void Move(float dx, float dy)
	{
		gameObject.transform.position += new Vector3(dx, dy);
	}
}
