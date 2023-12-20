using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FireEffectController : MonoBehaviour
{
    public GameObject[] allParticles;

    public void DeactivateParticles()
    {
        for (int i = 0; i < allParticles.Length; i++)
        {
            allParticles[i].SetActive(false);
        }
    }

    public void EnableParticles()
    {
        for (int i = 0; i < allParticles.Length; i++)
        {
            allParticles[i].SetActive(true);
        }
    }
}
