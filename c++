long double changeNumberLongDouble(long double Number)  //number = 54,67
{
    int right1, n = 0;
    long double sum, right, left;
    right = (int)Number;        // 54
    left = (Number - right) * 100;  // (54,67 - 54 )*100= 67.000000000001
    left = int(left);   //67
    right1 = int(right);    
    while (right1 != 0) //right1 = 54
    {
        right1 = right1 / 10;
        n++;    //2
    }
    right = right / pow(10, n);
    sum = right + left;
    return sum;
}