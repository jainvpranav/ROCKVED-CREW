using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class pipeMoveScript : MonoBehaviour
{
    public float moveSpeed = 5;
    public float deadZone = -45;

    public LogicScript logic;
    // Start is called before the first frame update
    void Start()
    {
        logic = GameObject.FindGameObjectWithTag("Logic").GetComponent<LogicScript>(); 
    }

    // Update is called once per frame
    void Update()
    {
        transform.position = transform.position + (Vector3.left * moveSpeed) * Time.deltaTime;
        if(transform.position.x < deadZone) {
            // Debug.Log("pipe deleted");
            // Destroy(gameObject);
            transform.position = new Vector3(62f, Random.Range(-10f, 10f), 0);
        
            transform.rotation = new Quaternion((Random.Range(0, 2) * 180), 0, 0, 0);

            logic.SetCurrentQuestion();
        }
    }
}
