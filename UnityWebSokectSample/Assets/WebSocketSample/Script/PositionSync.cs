using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;
using UniRx;

public class PositionSync : MonoBehaviour {

    [SerializeField] private string _serverAddress;
    [SerializeField] private int _port;

    [SerializeField] private Transform _syncObjTransform;
    [SerializeField] private SyncPhase _nowPhase;

    private WebSocket ws;

    public enum SyncPhase {
        Idling,
        Syncing
    }

    private void Awake() {
        _nowPhase = SyncPhase.Idling;
        
        //前フレームと値が変更されていた場合，OnNextに値を流す
        IObservable <Vector3> cTransformValue = gameObject.ObserveEveryValueChanged(_ => _syncObjTransform.position); 
        //OnChangedTargetTransformValue関数を実行
        cTransformValue.Subscribe(x => OnChangedTargetTransformValue(x));
    }

   
    public void OnSyncStartButtonDown() {
        var ca = "ws://" + _serverAddress + ":" + _port.ToString();
        //Debug.Log("Connect to " + ca);
        ws = new WebSocket(ca);

        //Add Events
        //On catch message event
        ws.OnMessage += (object sender, MessageEventArgs e) => {
            print("e.data:"+e.Data);
            Debug.Log("value:" + sender);
        };

        //On error event
        ws.OnError += (sender, e) => {
            Debug.Log("WebSocket Error Message: " + e.Message);
            _nowPhase = SyncPhase.Idling;
        };

        //On WebSocket close event
        ws.OnClose += (sender, e) => {
            Debug.Log("Disconnected Server");
        };

        ws.Connect();

        _nowPhase = SyncPhase.Syncing;
    }

    /// <summary>
    /// Get Down Stop Sync Button
    /// </summary>
    public void OnSyncStopButtonDown() {
        ws.Close(); //Disconnect
    }

    public void OnChangedTargetTransformValue(Vector3 pos) {
        if (_nowPhase == SyncPhase.Syncing) {
            //Debug.Log(pos);
            ws.Send(pos.ToString());
        }
    }
}