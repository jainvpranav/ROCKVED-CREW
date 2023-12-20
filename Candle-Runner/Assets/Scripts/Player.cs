using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;

public class NewBehaviourScript : MonoBehaviour
{

    public Rigidbody rb;
    public float forwardSpeed = 10f;
    private float sideSpeed;
    // Start is called before the first frame update
    [SerializeField]
    private Vector2 minMaxX;
    public GameObject GameOver;
    public GameObject GameScreen;
    void Start()
    {
        transform.DOScaleY(0, 8);
    }

    // Update is called once per frame
    void Update()
    {

        //this is for clamping the x axis : 
        transform.position = new Vector3(Mathf.Clamp(transform.position.x, minMaxX.x, minMaxX.y), -0.5f, transform.position.z);

        if(Input.GetKey(KeyCode.LeftArrow)) sideSpeed = -10f;
        // else if(Input.GetKeyUp(KeyCode.LeftArrow) && Input.GetKeyUp(KeyCode.RightArrow)) sideSpeed = 0;
        else if(Input.GetKey(KeyCode.RightArrow)) sideSpeed = 10f; 
        else sideSpeed = 0;
        rb.velocity = new Vector3(sideSpeed, rb.velocity.y, forwardSpeed);

        if(transform.localScale.y <= 0.25f) {
            DOTween.Kill (transform);
            Debug.Log("Game over");
            GameScreen.SetActive(false);
            GameOver.SetActive(true);
        }
    }

    private void OnTriggerEnter(Collider other) {
        if(other.gameObject.CompareTag("SmallCandle")) {
            Destroy(other.gameObject);
            DOTween.Kill(transform);
            transform.DOScale(1.2f, 1).OnComplete(() => {
                    transform.DOScaleY(0, 8);
            });
        }
    }
}
