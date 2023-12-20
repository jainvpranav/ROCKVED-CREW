using System.Collections;
using UnityEngine;

[CreateAssetMenu(fileName = "QuestionsManager")]
public class AllQuestionsManager : ScriptableObject
{
    public Question[] allPossibleQuestions;
}