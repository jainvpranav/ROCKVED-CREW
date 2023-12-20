using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OrbitScript : MonoBehaviour
{

    public float rotationSpeed;

    public void Update()
    {
        Rotate();
    }

    public void Rotate()
    {
        transform.Rotate(0, rotationSpeed * Time.deltaTime, 0);
    }
}
