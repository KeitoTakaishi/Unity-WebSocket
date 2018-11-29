using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;
using UniRx;
using UniRx.Triggers;
using UnityEngine.Scripting.APIUpdating;

public class WhereSample : Base {

	void Start ()
	{
		Observable.Return(new Vector2(0, 0.5f))
			.Subscribe(v => gameObject.transform.position = v);
		this.UpdateAsObservable()
			.Where(_ => Input.GetMouseButton(0))
			.Subscribe(l => Move(0.01f, 0));

	}
	
	
}
