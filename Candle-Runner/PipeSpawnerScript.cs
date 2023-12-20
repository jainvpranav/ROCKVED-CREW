using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PipeSpawnerScript : MonoBehaviour
{
    public GameObject pipe;
    public float spawnRate;
    private float timer = 0;
    public float heightOffs;

    // Start is called before the first frame update
    void Start()
    {
        spawnPipe();
    }

    // Update is called once per frame
    void Update()
    {
        if (timer < spawnRate)
        {
            timer = timer + Time.deltaTime;
        }
        else
        {
            spawnPipe();
            timer = 0;
        }
    }

    void spawnPipe()
    {
        float lowestPoint = transform.position.y - heightOffs;
        float highestPoint = transform.position.y + heightOffs;

        // Generate a random rotation: either 0 or 180 degrees
        float randomRotation = 120;

        // Use the random rotation angle in the Quaternion.Euler function
        Quaternion rotation = Quaternion.Euler(randomRotation, 0, 0);

        Instantiate(pipe, new Vector3(transform.position.x, Random.Range(lowestPoint, highestPoint), 0), rotation);
    }
}
