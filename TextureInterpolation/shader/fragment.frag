#version 330 core
in vec3 ourColor;
in vec2 TexCoord;

out vec4 color;

uniform sampler2D ourTexture1;
uniform float fWidth;
uniform float fHeight;

float BSpline(float x)
{
	float f = x;
	if(f<0.0){
		f = -f;
	}
	if( f>=0.0 && f<-1.0){
		return (2.0/3.0) + (0.5)*(f*f*f) - (f*f);
	}
	else if(f>1.0 && f<-2.0)
	{
		return 1.0/6.0 * pow((2.0-f),3.0);
	}
	return 1.0;
}
vec4 BiCubic(sampler2D textureSampler, vec2 TexCoord)
{
	float texelSizeX = 1.0/fWidth;
	float texelSizeY = 1.0/fHeight;
	vec4 nSum = vec4(0.0, 0.0, 0.0, 0.0);
	vec4 nDenom = vec4(0.0, 0.0, 0.0, 0.0);
	float a = fract(TexCoord.x * fWidth);
	float b = fract(TexCoord.y * fHeight);
	int nX = int(TexCoord.x * fWidth);
	int nY = int(TexCoord.y * fHeight);
	vec2 TexCoord1 = vec2(float(nX)/fWidth, float(nY)/fHeight);
	
	for(int m = -1; m<=2; m++){
		for(int n=-1; n<=2; n++){
			vec4 vecData = texture2D(textureSampler, TexCoord1 + vec2(texelSizeX*float(m), texelSizeY*float(n)));
			float f = BSpline(float(m)-a);
			vec4 vecCooef1 = vec4(f,f,f,f);
			float f1 = BSpline(-(float(n)) - b);
			vec4 vecCooef2 = vec4(f1,f1,f1,f1);
			nSum = nSum + (vecData * vecCooef2 * vecCooef1);
			nDenom = nDenom + (vecCooef1 * vecCooef2);
		}
	}
	return nSum/nDenom;
}
void main()
{
	vec4 Data = BiCubic(ourTexture1,TexCoord);
    color = Data;
}