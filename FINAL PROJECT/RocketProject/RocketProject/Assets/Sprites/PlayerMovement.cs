using DG.Tweening;
using System.Collections;
using UnityEngine;


public class PlayerMovement : MonoBehaviour
{
    public Camera playerCamera;
    public float moveDistance;

    public Rigidbody[] AllBreakablePieces;



    public void MoveUpwards(int numberOfCorrectQuestions)
    {
        playerCamera.transform.DOShakePosition(3, .5f);
        BreakPieceAway(numberOfCorrectQuestions);
        numberOfCorrectQuestions++;
        
        if(numberOfCorrectQuestions < 5)
        {
            FireEffectController fireEffect = AllBreakablePieces[numberOfCorrectQuestions].GetComponent<FireEffectController>();
            fireEffect.EnableParticles();
        }

        StartCoroutine(IMoveUpwards());
    }

    public IEnumerator IMoveUpwards()
    {
        

        float t = 0;

        while(t < 3)
        {
            t += Time.deltaTime;
            transform.Translate(0, 1 * moveDistance * Time.deltaTime, 0);
            yield return null;
        }
    }

    public void BreakPieceAway(int index)
    {
        FireEffectController fireEffect = AllBreakablePieces[index].GetComponent<FireEffectController>();
        fireEffect.DeactivateParticles();

        Rigidbody rb = AllBreakablePieces[index];

        rb.isKinematic = false;
        rb.useGravity = true;

        rb.AddForce(Random.Range(-1f, 1f), Random.Range(-1f, -4f), Random.Range(-1f, 1f), ForceMode.Impulse);
    }

 
}