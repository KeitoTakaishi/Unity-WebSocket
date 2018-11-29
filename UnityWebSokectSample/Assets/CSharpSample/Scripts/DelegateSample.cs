using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;

public class DelegateSample : MonoBehaviour
{
    //public delegate bool Judgement(int value);
    //public int Count(int[] nums, Judgement judge){
    public int Count(int[] nums, Predicate <int> judge){
        
        int count = 0;
        foreach (var n in nums)
        {
            if (judge(n) == true)
            {
                count++;
            }
        }
        return count;
    }

    void Start()
    {
        var nums = new[] { 5, 3, 9, 6, 7, 5, 8, 10, 12};
        //Judgement judge = isEven;
        //var _count = Count(nums, judge);
        //var _count = Count(nums, delegate(int n) { return n % 2 == 0; });

        Predicate < int > judge =
            (int n) =>
            {
                if (n % 2 == 0)
                    return true;
                else
                    return false;
            };
        var _count = Count(nums, delegate(int n) { return n % 2 == 0; });
        Debug.Log(_count);
    }

    public bool isEven(int n)
    {
        return n % 2 == 0;
    }
}
