using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CorrectOption : MonoBehaviour
{
    public GameLogic logic;
    // Start is called before the first frame update
    void Start()
    {
        logic = GameObject.FindGameObjectWithTag("Logic").GetComponent<GameLogic>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnTriggerEnter(Collider collision) {
        logic.addScore();
    }

}
