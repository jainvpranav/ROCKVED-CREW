using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class GameStorageManager
{

    public static string playerOne;
    public static string playerTwo;


    public static void SetPlayerNames(string player1, string player2)
    {
        playerOne = player1;
        playerTwo = player2;
    }

    public static void ResetPlayerNames()
    {
        playerOne = string.Empty;
        playerTwo = string.Empty;
    }

}
