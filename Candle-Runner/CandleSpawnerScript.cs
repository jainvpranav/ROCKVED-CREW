using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CandleSpawner : MonoBehaviour
{
    [SerializeField] private int candleCount = 11;
    [SerializeField] private GameObject smallCandlePrefab;
    [SerializeField] private Vector2 minMaxXPos;
    private float zValue = 0f;
    private void Start() {
        for(int i = 0;i<candleCount;i++) {
            Vector3 spawnPos = new Vector3(Random.Range(minMaxXPos.x, minMaxXPos.y), 0, zValue + 20f);
            Instantiate(smallCandlePrefab, spawnPos, Quaternion.identity);
            zValue += 20f;
        }
    }
}
