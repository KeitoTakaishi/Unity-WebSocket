using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Threading;
using UnityEngine;
using UniRx;

public class TimerView : MonoBehaviour
{
	[SerializeField] private TimeCounter  _tm;
	void Start ()
	{
		_tm = this.GetComponent<TimeCounter>();
//		_tm.OnTimeChanged += time =>
//		{
//			Debug.Log(time);
//		};
//		_tm.OnTimeChanged += a =>
//		{
//			Debug.Log("----------------------");
//		};

		_tm.OnTimeChanged.Subscribe(_time =>
		{
			Debug.Log(_time);
		});



	}
	
	void Update () {
		
	}
}
