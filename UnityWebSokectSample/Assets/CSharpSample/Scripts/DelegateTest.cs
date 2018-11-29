using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DelegateTest : MonoBehaviour
{
    public delegate void TestCallBack(string s, float f);
    public static float totalTime = 0.0f;

    void Start(){
        
    }
    
    void Update () {
        totalTime += Time.deltaTime;
    }
    
    static public void Hoge(TestCallBack Callback, string s) {
        Callback(s, totalTime);
    }
}
