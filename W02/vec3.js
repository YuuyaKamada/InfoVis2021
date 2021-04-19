class Vec3
{
    constructor(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v)
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    sum()
    {
        return this.x + this.y + this.z;
    }

    min()
    {
        let n = this.x;
        if(n > this.y)
        {
            n = this.y;
        }
        if(n > this.z)
        {
            n = this.z;
        }
        return n;
    }

    mid()
    {
        let a = this.x;
        let b = this.y;
        let c = this.z;
        if((a > b && a < c ) || (a > c && a < b ))
        {
            return a;
        }
        else if((b > a && b < c ) || (b > c && b < a ))
        {
            return b;
        }
        else
        {
            return c;
        }
    }

    max()
    {
        let n = this.x;
        if(n < this.y)
        {
            n = this.y;
        }
        if(n < this.z)
        {
            n = this.z;
        }
        return n;
    }

    aaa(u0, u1, u2)
    {
        let l0 = Math.sqrt(Math.pow(u0.x - u1.x,2) + Math.pow(u0.y - u1.y,2) + Math.pow(u0.z - u1.z,2));
        let l1 = Math.sqrt(Math.pow(u1.x - u2.x,2) + Math.pow(u1.y - u2.y,2) + Math.pow(u1.z - u2.z,2));
        let l2 = Math.sqrt(Math.pow(u2.x - u0.x,2) + Math.pow(u2.y - u0.y,2) + Math.pow(u2.z - u0.z,2));
        let s = (l0 + l1 + l2)/2;

        return Math.sqrt(s*(s-l0)*(s-l1)*(s-l2));

    }
}