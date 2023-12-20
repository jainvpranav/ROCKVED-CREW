using System.Collections;
using System.Collections.Generic;
using JetBrains.Annotations;
using UnityEngine;

public class CameraFollow : MonoBehaviour
{

    public Transform target;
    public float smoothSpeed = 1f;

    private Vector3 offset;
    private void Awake() {
        offset = transform.position - target.position;
    }
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void LateUpdate()
    {
        transform.position = new Vector3(Mathf.Lerp(transform.position.x, target.position.x, smoothSpeed), transform.position.y, target.position.z + offset.z);
    }
}
